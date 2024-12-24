import React from "react";
import AnnouncementCard from "./announcement-card";

const Announcements = () => {
  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold">Announcements</h2>

      <ul className="flex flex-col gap-12">
        {[...new Array(8)].map((_, i) => (
          <li key={i}>
            <AnnouncementCard />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
