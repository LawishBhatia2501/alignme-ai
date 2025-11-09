import { useEffect, useRef, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { Pose, Results } from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { POSE_CONNECTIONS } from "@mediapipe/pose";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

const PostureDetector = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [postureStatus, setPostureStatus] = useState<"good" | "bad" | "checking">("checking");
  const [angles, setAngles] = useState({
    neck: 0,
    shoulder: 0,
    back: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const poseRef = useRef<Pose | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  const calculateAngle = (a: any, b: any, c: any): number => {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) {
      angle = 360 - angle;
    }
    return Math.round(angle);
  };

  const analyzePosture = (landmarks: any[]) => {
    // Calculate neck angle (ear - shoulder - hip)
    const leftEar = landmarks[7];
    const leftShoulder = landmarks[11];
    const leftHip = landmarks[23];
    const neckAngle = calculateAngle(leftEar, leftShoulder, leftHip);

    // Calculate shoulder angle
    const rightShoulder = landmarks[12];
    const shoulderAngle = Math.abs(leftShoulder.y - rightShoulder.y) * 100;

    // Calculate back angle (shoulder - hip - knee)
    const leftKnee = landmarks[25];
    const backAngle = calculateAngle(leftShoulder, leftHip, leftKnee);

    setAngles({
      neck: neckAngle,
      shoulder: Math.round(shoulderAngle),
      back: backAngle,
    });

    // Determine posture status
    // Good posture: neck angle close to 180°, shoulders level, back straight
    const isGoodPosture =
      neckAngle > 160 && neckAngle < 200 && 
      shoulderAngle < 5 && 
      backAngle > 170;

    setPostureStatus(isGoodPosture ? "good" : "bad");
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
    };

    initializePose();

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-6xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              AlignMe
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            AI-Powered Posture Correction System
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Feed */}
          <Card className="lg:col-span-2 border-border/50 shadow-hover">
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
                      className={`text-lg px-4 py-2 ${
                        postureStatus === "good" 
                          ? "bg-accent text-accent-foreground" 
                          : postureStatus === "bad"
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      Posture: {postureStatus === "good" ? "Good ✓" : postureStatus === "bad" ? "Bad ✗" : "Checking..."}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Angles Panel */}
          <Card className="border-border/50 shadow-hover">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Posture Angles</h3>
                <div className="space-y-4">
                  {/* Neck Angle */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Neck Alignment</span>
                      <span className="text-2xl font-bold text-primary">{angles.neck}°</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          angles.neck > 160 && angles.neck < 200
                            ? "bg-accent"
                            : "bg-destructive"
                        }`}
                        style={{ width: `${Math.min(100, (angles.neck / 180) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ideal: 160° - 200°
                    </p>
                  </div>

                  {/* Shoulder Level */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Shoulder Level</span>
                      <span className="text-2xl font-bold text-primary">{angles.shoulder}°</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          angles.shoulder < 5 ? "bg-accent" : "bg-destructive"
                        }`}
                        style={{ width: `${Math.min(100, (angles.shoulder / 20) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ideal: {"<"} 5° (level shoulders)
                    </p>
                  </div>

                  {/* Back Angle */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Back Alignment</span>
                      <span className="text-2xl font-bold text-primary">{angles.back}°</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          angles.back > 170 ? "bg-accent" : "bg-destructive"
                        }`}
                        style={{ width: `${Math.min(100, (angles.back / 180) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ideal: {">"} 170° (straight back)
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips Section */}
              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-3">Tips for Good Posture:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    <span>Keep your back straight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    <span>Align your head with your spine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    <span>Relax your shoulders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    <span>Keep feet flat on the floor</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostureDetector;
