import { Bird } from "lucide-react";
import React from "react";

export interface INoDataPage {
  message?: string;
}

const NoDataPage: React.FC<INoDataPage> = ({ message }) => {
  return (
    <div className="h-full my-auto">
      <Bird className="w-32 h-32 mx-auto text-yellow-600 mb-3" />
      <h1 className="text-center text-2xl mb-1">No data Found</h1>
      <p className="text-center text-lg text-muted-foreground">{message}</p>
    </div>
  );
};

NoDataPage.defaultProps = {};

export default NoDataPage;
