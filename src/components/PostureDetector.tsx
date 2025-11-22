import { useEffect, useRef, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { Pose, Results } from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { POSE_CONNECTIONS } from "@mediapipe/pose";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Download, Home } from "lucide-react";
import { Link } from "react-router-dom";
import SessionTimer from "./SessionTimer";
import PostureStats from "./PostureStats";
import SessionHistory from "./SessionHistory";
import SettingsPanel from "./SettingsPanel";
import { usePostureAudio } from "@/hooks/usePostureAudio";
import { useToast } from "@/hooks/use-toast";
import { PostureClassifier, calculateAngle } from "@/utils/postureClassifier";

interface HistoryItem {
  timestamp: number;
  neck: number;
  shoulder: number;
  back: number;
  status: string;
}

interface Session {
  id: string;
  date: string;
  duration: number;
  goodPercentage: number;
  badPercentage: number;
}

const PostureDetector = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  
  const [postureStatus, setPostureStatus] = useState<"good" | "okay" | "bad" | "checking">("checking");
  const [angles, setAngles] = useState({
    neck: 0,
    shoulder: 0,
    back: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  
  // Statistics
  const [goodCount, setGoodCount] = useState(0);
  const [okayCount, setOkayCount] = useState(0);
  const [badCount, setBadCount] = useState(0);
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  
  // Settings
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [alertInterval, setAlertInterval] = useState(10);
  const [sensitivity, setSensitivity] = useState(2); // 1=strict, 2=normal, 3=relaxed
  
  const poseRef = useRef<Pose | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const classifierRef = useRef(new PostureClassifier());
  const { playAlert } = usePostureAudio(audioEnabled, alertInterval);

  const analyzePosture = (landmarks: any[]) => {
    // Extract key landmarks - exact same as app.py
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftEar = landmarks[7];
    const rightEar = landmarks[8];

    // Calculate midpoints (exact same as app.py)
    const midShoulder = [
      (leftShoulder.x + rightShoulder.x) / 2,
      (leftShoulder.y + rightShoulder.y) / 2,
    ];
    const midHip = [
      (leftHip.x + rightHip.x) / 2,
      (leftHip.y + rightHip.y) / 2,
    ];
    const midEar = [
      (leftEar.x + rightEar.x) / 2,
      (leftEar.y + rightEar.y) / 2,
    ];

    // Calculate angles - exact same as app.py
    const backAngle = calculateAngle(midEar, midShoulder, midHip);
    const shoulderLevel = Math.abs(leftShoulder.y - rightShoulder.y) * 100;
    const neckAngle = calculateAngle(
      [leftShoulder.x, leftShoulder.y], 
      midEar, 
      [rightShoulder.x, rightShoulder.y]
    );

    const currentAngles = {
      neck: Math.round(neckAngle * 10) / 10,
      shoulder: Math.round(shoulderLevel * 10) / 10,
      back: Math.round(backAngle * 10) / 10,
    };

    setAngles(currentAngles);

    // Determine posture status using classifier (exact thresholds from app.py)
    const status = classifierRef.current.classify(backAngle, shoulderLevel);

    // Update counters
    if (status === "good") {
      setGoodCount(prev => prev + 1);
    } else if (status === "okay") {
      setOkayCount(prev => prev + 1);
    } else {
      setBadCount(prev => prev + 1);
      playAlert();
    }

    setPostureStatus(status);

    // Add to history (limit to last 100 entries for performance)
    setHistoryData(prev => {
      const newData = [...prev, {
        timestamp: Date.now(),
        ...currentAngles,
        status,
      }];
      return newData.slice(-100);
    });
  };

  const onResults = (results: Results) => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvasCtx = canvasRef.current.getContext("2d");
    if (!canvasCtx) return;

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;

    // Clear canvas
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw the video frame
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    if (results.poseLandmarks) {
      // Draw pose landmarks
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 4,
      });
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: "#FF0000",
        lineWidth: 2,
        radius: 6,
      });

      // Analyze posture
      analyzePosture(results.poseLandmarks);
    }

    canvasCtx.restore();
  };

  useEffect(() => {
    const initializePose = async () => {
      if (!videoRef.current) return;

      const pose = new Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults(onResults);
      poseRef.current = pose;

      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current && poseRef.current) {
            await poseRef.current.send({ image: videoRef.current });
          }
        },
        width: 1280,
        height: 720,
      });

      cameraRef.current = camera;
      await camera.start();
      setIsLoading(false);
      setIsActive(true);
    };

    initializePose();

    // Load sessions from localStorage
    const savedSessions = localStorage.getItem("alignme_sessions");
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, [sensitivity]);

  const saveSession = () => {
    const total = goodCount + okayCount + badCount;
    if (total === 0) return;

    const goodPercentage = Math.round((goodCount / total) * 100);
    const badPercentage = Math.round((badCount / total) * 100);
    const sessionTime = parseInt(localStorage.getItem("alignme_session_time") || "0");

    const newSession: Session = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      duration: sessionTime,
      goodPercentage,
      badPercentage,
    };

    const updatedSessions = [newSession, ...sessions].slice(0, 10); // Keep last 10 sessions
    setSessions(updatedSessions);
    localStorage.setItem("alignme_sessions", JSON.stringify(updatedSessions));

    toast({
      title: "Session Saved",
      description: `${goodPercentage}% good posture maintained`,
    });
  };

  const exportData = () => {
    const csvContent = [
      ["Timestamp", "Neck Angle", "Shoulder Level", "Back Angle", "Status"],
      ...historyData.map(item => [
        new Date(item.timestamp).toISOString(),
        item.neck,
        item.shoulder,
        item.back,
        item.status,
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `posture-data-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Data Exported",
      description: "Posture data saved as CSV",
    });
  };

  const clearHistory = () => {
    setSessions([]);
    localStorage.removeItem("alignme_sessions");
    toast({
      title: "History Cleared",
      description: "All session history has been removed",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="w-full max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                AlignMe
              </h1>
              <p className="text-sm text-muted-foreground">
                AI-Powered Posture Correction
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Button onClick={saveSession} variant="outline" size="sm">
              Save Session
            </Button>
            <Button onClick={exportData} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Session Timer */}
        <SessionTimer isActive={isActive} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-4">
          {/* Video Feed */}
          <Card className="lg:col-span-3 border-border/50 shadow-hover">
            <CardContent className="p-6">
              <div className="relative aspect-video bg-card rounded-lg overflow-hidden">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <div className="text-center space-y-2">
                      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                      <p className="text-sm text-muted-foreground">Initializing camera...</p>
                    </div>
                  </div>
                )}
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover hidden"
                  playsInline
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Posture Status Overlay */}
                {!isLoading && (
                  <div className="absolute top-4 left-4">
                    <Badge 
                      className={`text-base px-3 py-1.5 ${
                        postureStatus === "good" 
                          ? "bg-accent text-accent-foreground" 
                          : postureStatus === "okay"
                          ? "bg-warning text-warning-foreground"
                          : postureStatus === "bad"
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {postureStatus === "good" ? "✓ Good" : postureStatus === "okay" ? "~ Okay" : postureStatus === "bad" ? "✗ Bad" : "Checking..."}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            {/* Angles Panel */}
            <Card className="border-border/50 shadow-hover">
              <CardContent className="p-4 space-y-4">
                <h3 className="text-lg font-bold mb-3">Live Angles</h3>
                 <div className="space-y-3">
                   {/* Back Angle */}
                   <div className="space-y-1.5">
                     <div className="flex items-center justify-between">
                       <span className="text-xs font-medium">Back Alignment</span>
                       <span className="text-xl font-bold text-primary">{angles.back}°</span>
                     </div>
                     <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                       <div
                         className={`h-full transition-all duration-300 ${
                           angles.back > 150 ? "bg-accent" : angles.back > 130 ? "bg-warning" : "bg-destructive"
                         }`}
                         style={{ width: `${Math.min(100, (angles.back / 180) * 100)}%` }}
                       />
                     </div>
                     <p className="text-xs text-muted-foreground">Good: &gt;150° | Okay: &gt;130°</p>
                   </div>

                   {/* Shoulder Level */}
                   <div className="space-y-1.5">
                     <div className="flex items-center justify-between">
                       <span className="text-xs font-medium">Shoulder Level</span>
                       <span className="text-xl font-bold text-primary">{angles.shoulder.toFixed(1)}</span>
                     </div>
                     <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                       <div
                         className={`h-full transition-all duration-300 ${
                           angles.shoulder < 5 ? "bg-accent" : angles.shoulder < 8 ? "bg-warning" : "bg-destructive"
                         }`}
                         style={{ width: `${Math.min(100, (angles.shoulder / 15) * 100)}%` }}
                       />
                     </div>
                     <p className="text-xs text-muted-foreground">Good: &lt;5 | Okay: &lt;8</p>
                   </div>

                   {/* Neck Angle */}
                   <div className="space-y-1.5">
                     <div className="flex items-center justify-between">
                       <span className="text-xs font-medium">Neck Angle</span>
                       <span className="text-xl font-bold text-primary">{angles.neck}°</span>
                     </div>
                     <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                       <div
                         className={`h-full transition-all duration-300 bg-primary`}
                         style={{ width: `${Math.min(100, (angles.neck / 180) * 100)}%` }}
                       />
                     </div>
                     <p className="text-xs text-muted-foreground">Reference angle</p>
                   </div>
                 </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <PostureStats
              historyData={historyData}
              goodCount={goodCount}
              okayCount={okayCount}
              badCount={badCount}
            />

            {/* Settings */}
            <SettingsPanel
              audioEnabled={audioEnabled}
              onAudioToggle={setAudioEnabled}
              alertInterval={alertInterval}
              onAlertIntervalChange={setAlertInterval}
              sensitivity={sensitivity}
              onSensitivityChange={setSensitivity}
            />

            {/* Session History */}
            <SessionHistory sessions={sessions} onClearHistory={clearHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostureDetector;
