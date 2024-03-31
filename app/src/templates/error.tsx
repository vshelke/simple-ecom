import { ServerCrash } from "lucide-react";
import React from "react";

export interface IErrorpage {
  error?: string;
}

const Errorpage: React.FC<IErrorpage> = ({ error }) => {
  return (
    <div className="h-full my-auto">
      <ServerCrash className="w-32 h-32 mx-auto text-red-600 mb-3" />
      <h1 className="text-center text-2xl mb-1">
        Error Occured
      </h1>
      <p className="text-center text-lg text-muted-foreground">
        {error}
      </p>
    </div>
  );
};

Errorpage.defaultProps = {};

export default Errorpage;
