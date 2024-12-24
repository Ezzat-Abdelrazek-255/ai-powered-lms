import React from "react";

const AnnouncementCard = () => {
  return (
    <article className="flex flex-col gap-4 rounded-[1rem] border-[1px] border-foreground p-6">
      <div className="flex items-center gap-4">
        <div className="aspect-square h-12 rounded-full bg-muted-foreground"></div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold">
            This is the title for the announcement
          </h3>
          <p>by Anna Alexander - Sunday, 6 October 2024, 10:27 AM</p>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </p>
      <div>
        <div className="h-80 w-full rounded-[1rem] bg-foreground"></div>
      </div>
    </article>
  );
};

export default AnnouncementCard;
