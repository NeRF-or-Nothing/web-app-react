/**
 * I assume this component was supposed to be used for users to share their own rendered scenes, but as
 * there is zero backend functionality, this is just a placeholder for now. Maybe in the future, this could
 * be implemented.
 */

import './Community.css';
import NavBar from '../NavbarLink/NavbarLink';
import EachPost from '../EachPost/EachPost';

export default function Community() {
  return (
    <div>
      <NavBar />
      <div className="mainDiv">
        <EachPost />
        <EachPost />
        <EachPost />
        <EachPost />
        <EachPost />
        <EachPost />
        <EachPost />
        <EachPost />
        <EachPost />
        <EachPost />
      </div>
    </div>
  );
}
