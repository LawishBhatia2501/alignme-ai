import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Session {
  id: string;
  date: string;
  duration: number;
  goodPercentage: number;
  badPercentage: number;
}

interface SessionHistoryProps {
  sessions: Session[];
  onClearHistory: () => void;
}

const SessionHistory = ({ sessions, onClearHistory }: SessionHistoryProps) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="w-5 h-5" />
          Session History
        </CardTitle>
        {sessions.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClearHistory}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No session history yet. Start monitoring your posture!
          </p>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium">{session.date}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDuration(session.duration)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-accent/20 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-accent h-full transition-all"
                      style={{ width: `${session.goodPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-accent">
                    {session.goodPercentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionHistory;
