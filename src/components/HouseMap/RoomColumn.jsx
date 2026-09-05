/* eslint-disable react/prop-types */
import RoomTile from "./RoomTile";

// One filtered, sorted group of room tiles for a single category+position
// pair on the House Map — replaces the six near-identical
// filter().sort().map() blocks that used to be written out inline.
const RoomColumn = ({ rooms, category, position, className, tileProps }) => {
  const matched = rooms
    .filter((room) => room.category === category && room.position === position)
    .sort((a, b) => a.roomNo - b.roomNo);

  return (
    <div className={className}>
      {matched.map((room) => (
        <RoomTile key={room._id || room.roomNo} room={room} {...tileProps} />
      ))}
    </div>
  );
};

export default RoomColumn;
