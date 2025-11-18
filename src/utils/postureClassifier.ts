// Posture classification based on the trained model logic
// Using the same angle thresholds from the dataset

interface PostureAngles {
  shoulder: number;
  elbow: number;
  hip: number;
  knee: number;
  neck: number;
}

export type PostureStatus = "good" | "okay" | "bad" | "checking";

export class PostureClassifier {
  // Based on posture_data.csv analysis:
  // Good: shoulder(170-179), elbow(160-174), hip(165-174), knee(170-179), neck(155-164)
  // Bad: shoulder(110-130), elbow(90-110), hip(125-140), knee(135-145), neck(105-115)
  
  private goodRanges = {
    shoulder: { min: 160, max: 179 },
    elbow: { min: 160, max: 180 },
    hip: { min: 165, max: 180 },
    knee: { min: 170, max: 180 },
    neck: { min: 155, max: 170 },
  };

  private badRanges = {
    shoulder: { min: 90, max: 140 },
    elbow: { min: 80, max: 120 },
    hip: { min: 115, max: 150 },
    knee: { min: 130, max: 160 },
    neck: { min: 90, max: 125 },
  };

  classify(angles: PostureAngles): PostureStatus {
    let goodScore = 0;
    let badScore = 0;

    // Check each angle against good and bad ranges
    Object.keys(angles).forEach((key) => {
      const angle = angles[key as keyof PostureAngles];
      const goodRange = this.goodRanges[key as keyof typeof this.goodRanges];
      const badRange = this.badRanges[key as keyof typeof this.badRanges];

      if (angle >= goodRange.min && angle <= goodRange.max) {
        goodScore++;
      }
      
      if (angle >= badRange.min && angle <= badRange.max) {
        badScore++;
      }
    });

    // Decision logic: need at least 3 out of 5 angles in good range for "good"
    // need at least 3 out of 5 angles in bad range for "bad"
    // otherwise "okay"
    if (goodScore >= 3) {
      return "good";
    } else if (badScore >= 3) {
      return "bad";
    } else {
      return "okay";
    }
  }

  // Alternative method using the angle thresholds from app.py
  classifySimple(backAngle: number, shoulderLevel: number, neckAngle: number): PostureStatus {
    // From app.py logic:
    // Good: back_angle > 150, shoulder_level < 5
    // Okay: back_angle > 130, shoulder_level < 8
    // Bad: otherwise

    if (backAngle > 160 && shoulderLevel < 5 && neckAngle > 155 && neckAngle < 170) {
      return "good";
    } else if (backAngle > 140 && shoulderLevel < 8 && neckAngle > 145 && neckAngle < 180) {
      return "okay";
    } else {
      return "bad";
    }
  }
}
