import { Progress } from "@/components/ui/progress";
import { Boxes } from "lucide-react";
import React from "react";

export interface ILoadingPage {}

const LoadingPage: React.FC<ILoadingPage> = ({}) => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(93), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full my-auto">
      <Boxes className="w-32 h-32 mx-auto text-green-600" />
      <h1 className="text-center text-3xl mb-7 text-muted-foreground">Loading...</h1>
      <Progress value={progress} className="w-[60%] mx-auto" />
    </div>
  );
};

LoadingPage.defaultProps = {};

export default LoadingPage;
