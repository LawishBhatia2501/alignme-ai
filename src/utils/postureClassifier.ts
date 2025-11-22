// Posture classification based on app.py logic and posture_data.csv
// Using exact angle thresholds from the Python implementation

export type PostureStatus = "good" | "okay" | "bad" | "checking";

export class PostureClassifier {
  // Refined thresholds based on app.py and dataset analysis:
  // Good: back_angle > 155 AND shoulder_level < 4
  // Okay: back_angle > 135 AND shoulder_level < 7
  // Bad: otherwise
  
  classify(backAngle: number, shoulderLevel: number): PostureStatus {
    // More accurate thresholds for better detection
    if (backAngle >= 155 && shoulderLevel < 4) {
      return "good";
    } else if (backAngle >= 135 && shoulderLevel < 7) {
      return "okay";
    } else {
      return "bad";
    }
  }
}

// Angle calculation function matching angle_utils.py
export function calculateAngle(a: number[], b: number[], c: number[]): number {
  // Convert to vectors
  const ba = [a[0] - b[0], a[1] - b[1]];
  const bc = [c[0] - b[0], c[1] - b[1]];
  
  // Calculate dot product
  const dotProduct = ba[0] * bc[0] + ba[1] * bc[1];
  
  // Calculate magnitudes
  const magnitudeBA = Math.sqrt(ba[0] * ba[0] + ba[1] * ba[1]);
  const magnitudeBC = Math.sqrt(bc[0] * bc[0] + bc[1] * bc[1]);
  
  // Calculate cosine angle
  const cosineAngle = dotProduct / (magnitudeBA * magnitudeBC);
  
  // Clamp cosine value to [-1, 1] to handle floating point errors
  const clampedCosine = Math.max(-1, Math.min(1, cosineAngle));
  
  // Calculate angle in degrees
  const angle = Math.acos(clampedCosine) * (180 / Math.PI);
  
  return angle;
}
