import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Settings } from "lucide-react";

interface SettingsPanelProps {
  audioEnabled: boolean;
  onAudioToggle: (enabled: boolean) => void;
  alertInterval: number;
  onAlertIntervalChange: (interval: number) => void;
  sensitivity: number;
  onSensitivityChange: (sensitivity: number) => void;
}

const SettingsPanel = ({
  audioEnabled,
  onAudioToggle,
  alertInterval,
  onAlertIntervalChange,
  sensitivity,
  onSensitivityChange,
}: SettingsPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Audio Alerts */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="audio-alerts">Audio Alerts</Label>
            <p className="text-xs text-muted-foreground">
              Play sound when bad posture detected
            </p>
          </div>
          <Switch
            id="audio-alerts"
            checked={audioEnabled}
            onCheckedChange={onAudioToggle}
          />
        </div>

        {/* Alert Interval */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Alert Interval</Label>
            <span className="text-sm text-muted-foreground">{alertInterval}s</span>
          </div>
          <Slider
            value={[alertInterval]}
            onValueChange={(value) => onAlertIntervalChange(value[0])}
            min={5}
            max={60}
            step={5}
            className="w-full"
            disabled={!audioEnabled}
          />
          <p className="text-xs text-muted-foreground">
            Time between alerts for bad posture
          </p>
        </div>

        {/* Sensitivity */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Detection Sensitivity</Label>
            <span className="text-sm text-muted-foreground">
              {sensitivity === 1 ? "Strict" : sensitivity === 2 ? "Normal" : "Relaxed"}
            </span>
          </div>
          <Slider
            value={[sensitivity]}
            onValueChange={(value) => onSensitivityChange(value[0])}
            min={1}
            max={3}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Adjust posture detection strictness
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsPanel;
