import { useSelector } from "react-redux";
import { RootState } from "../../utils/store";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="profile">
      <h1>Profile</h1>
      <h2>name : {user.name}</h2>
    </div>
  );
};

export default Profile;
