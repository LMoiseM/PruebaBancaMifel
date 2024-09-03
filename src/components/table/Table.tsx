import { FC, useState } from 'react';
import { Users } from '../../interfaces/users.interface';
import MapView from '../map/MapView';

type TableProps = {
  data: Users[] | null;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

const Table: FC<TableProps> = ({ data }) => {

  const [selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Website</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.website}</td>
                <td className="action-buttons">
                  <button className="edit" onClick={() => setSelectedCoordinates({ lat: user.address.geo.lat, lng: user.address.geo.lng })}>Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCoordinates && (
        <MapView lat={selectedCoordinates.lat} lng={selectedCoordinates.lng} />
      )}
    </>
  );
};

export default Table;
