import type {  LucideIcon } from "lucide-react";

 interface FindOneJobInfosFieldProps {
icon : LucideIcon;
title: string;
value: string;

}

export const FindOneJobInfosField = ({ icon, title, value } :FindOneJobInfosFieldProps ) => {

  const Icon = icon;
  return (
    <li className="flex items-center">
      <Icon size={18}/>
      <div className="ms-4">
        <p className="font-medium ">{title}</p>
        <span className=" font-medium text-sm text-blue-600/80">{value}</span>
      </div>
    </li>
  );
};
