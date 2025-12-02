import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Download, Home, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import SessionTimer from "./SessionTimer";
import PostureStats from "./PostureStats";
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
  const { theme, setTheme } = useTheme();
  
  const [postureStatus, setPostureStatus] = useState<"good" | "okay" | "bad" | "checking">("checking");
  const [angles, setAngles] = useState({
    neck: 0,
    shoulder: 0,
    back: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Statistics
  const [goodCount, setGoodCount] = useState(0);
  const [okayCount, setOkayCount] = useState(0);
  const [badCount, setBadCount] = useState(0);
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  
  // Settings - fixed values for audio
  const audioEnabled = true;
  const alertInterval = 10;
  const sensitivity = 2;
  
  const poseRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const classifierRef = useRef(new PostureClassifier());
  const { playAlert } = usePostureAudio(audioEnabled, alertInterval);

  const analyzePosture = (landmarks: any[]) => {
    // Extract key landmarks
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftEar = landmarks[7];
    const rightEar = landmarks[8];

    // Calculate midpoints
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

    // Calculate angles
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

    // Classify posture
    const status = classifierRef.current.classify(
      currentAngles.back,
      currentAngles.shoulder
    );
    setPostureStatus(status);

    // Update counts
    if (status === "good") {
      setGoodCount((prev) => prev + 1);
    } else if (status === "okay") {
      setOkayCount((prev) => prev + 1);
    } else if (status === "bad") {
      setBadCount((prev) => prev + 1);
      playAlert();
    }

    // Add to history
    setHistoryData((prev) => {
      const newData = [
        ...prev,
        {
          timestamp: Date.now(),
          ...currentAngles,
          status,
        },
      ].slice(-100); // Keep last 100 items
      return newData;
    });
  };

  const onResults = (results: any) => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvasCtx = canvasRef.current.getContext("2d");
    if (!canvasCtx) return;

    canvasCtx.save();
    canvasCtx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    // Draw video frame
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    if (results.poseLandmarks) {
      // Draw pose landmarks using global drawing_utils
      const drawingUtils = (window as any).drawingUtils || (window as any);
      if (drawingUtils.drawConnectors) {
        drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, (window as any).POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 1,
        });
        drawingUtils.drawLandmarks(canvasCtx, results.poseLandmarks, {
          color: "#FF0000",
          lineWidth: 0.5,
          radius: 1.5,
        });
      }

      // Analyze posture
      analyzePosture(results.poseLandmarks);
    }

    canvasCtx.restore();
  };

  useEffect(() => {
    const initializePose = async () => {
      try {
        if (!videoRef.current) return;

        // Wait for MediaPipe scripts to load
        const waitForMediaPipe = () => {
          return new Promise<void>((resolve, reject) => {
            const checkInterval = setInterval(() => {
              if ((window as any).Pose && (window as any).Camera) {
                clearInterval(checkInterval);
                resolve();
              }
            }, 100);

            setTimeout(() => {
              clearInterval(checkInterval);
              reject(new Error("MediaPipe libraries failed to load"));
            }, 10000);
          });
        };

        await waitForMediaPipe();

        // Request camera permissions first
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user"
          } 
        });
        
        stream.getTracks().forEach(track => track.stop());

        // Initialize MediaPipe Pose using global object
        const Pose = (window as any).Pose;
        const pose = new Pose({
          locateFile: (file: string) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5/${file}`;
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

        // Initialize camera using global Camera object
        const Camera = (window as any).Camera;
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
        setError(null);
      } catch (err) {
        console.error("Error initializing camera/pose:", err);
        setIsLoading(false);
        
        if (err instanceof Error) {
          if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
            setError("Camera access denied. Please allow camera permissions in your browser settings and refresh the page.");
          } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
            setError("No camera found. Please connect a camera and refresh the page.");
          } else if (err.name === "NotReadableError") {
            setError("Camera is already in use by another application. Please close other apps using the camera.");
          } else {
            setError("Failed to initialize camera. Please refresh the page and try again.");
          }
        } else {
          setError("Failed to initialize camera. Please refresh the page and try again.");
        }

        toast({
          title: "Camera Error",
          description: "Unable to access camera. Please check permissions.",
          variant: "destructive",
        });
      }
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
      if (poseRef.current) {
        poseRef.current.close();
      }
    };
  }, []);

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

    const updatedSessions = [newSession, ...sessions].slice(0, 10);
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AlignMe</h1>
                <p className="text-xs text-muted-foreground">AI-Powered Posture Correction</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-2">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <Button onClick={saveSession} size="sm" variant="outline">
                Save Session
              </Button>
              <Button onClick={exportData} size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Session Timer */}
        <SessionTimer isActive={isActive} />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-5 gap-6 mt-6">
          {/* Video Feed - Left Side */}
          <Card className="lg:col-span-3 border-border/50 shadow-hover">
            <CardContent className="p-6">
              <div className="relative aspect-video bg-card rounded-xl overflow-hidden shadow-soft">
                {isLoading && !error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <div className="text-center space-y-3">
                      <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                      <p className="text-sm font-medium">Initializing camera...</p>
                      <p className="text-xs text-muted-foreground">Please allow camera access when prompted</p>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted p-6">
                    <div className="text-center space-y-4 max-w-md">
                      <div className="text-5xl">📷</div>
                      <p className="text-sm font-medium text-destructive">{error}</p>
                      <Button onClick={() => window.location.reload()} variant="outline" size="sm">
                        Refresh Page
                      </Button>
                    </div>
                  </div>
                )}
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover hidden"
                  playsInline
                  autoPlay
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Posture Status Badge */}
                {!isLoading && !error && (
                  <div className="absolute top-4 left-4">
                    <Badge 
                      className={`text-base px-4 py-2 font-bold shadow-glow ${
                        postureStatus === "good" 
                          ? "bg-success text-success-foreground" 
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

          {/* Right Sidebar - Live Angles and Stats Only */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Angles */}
            <Card className="border-border/50 shadow-hover card-gradient">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold mb-4">Live Angles</h3>
                <div className="space-y-4">
                  {/* Back Angle */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Back Alignment</span>
                      <span className="text-2xl font-bold text-primary">{angles.back}°</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          angles.back >= 155 ? "bg-accent" : angles.back >= 135 ? "bg-warning" : "bg-destructive"
                        }`}
                        style={{ width: `${Math.min(100, (angles.back / 180) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Good: ≥155° | Okay: ≥135°</p>
                  </div>

                  {/* Shoulder Level */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Shoulder Level</span>
                      <span className="text-2xl font-bold text-primary">{angles.shoulder.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          angles.shoulder < 4 ? "bg-accent" : angles.shoulder < 7 ? "bg-warning" : "bg-destructive"
                        }`}
                        style={{ width: `${Math.min(100, (angles.shoulder / 15) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Good: &lt;4 | Okay: &lt;7</p>
                  </div>

                  {/* Neck Angle */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Neck Angle</span>
                      <span className="text-2xl font-bold text-primary">{angles.neck}°</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full transition-all duration-300 bg-primary"
                        style={{ width: `${Math.min(100, (angles.neck / 180) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Reference angle</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posture Statistics */}
            <PostureStats
              historyData={historyData}
              goodCount={goodCount}
              okayCount={okayCount}
              badCount={badCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostureDetector;
