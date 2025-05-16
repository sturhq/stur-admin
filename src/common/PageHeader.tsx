import React from 'react';

interface PageHeaderProps {
  title: string;
  button?: React.ReactNode;
}

const PageHeader = ({title, button}: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-[1.75rem] font-bold">{title}</h1>
      {button}
    </div>
  );
};

export default PageHeader;
