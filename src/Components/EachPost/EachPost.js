import React from "react";
import "./EachPost.css";

export default function EachPost() {
  return (
    <div class="card">
      <div class="card-header">
        @Username
      </div>
      <div class="card-body">
        <h5 class="card-title">Here is my post.</h5>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqxy5v16LUu2-LsRUaypLBwZQEaxMzDl678oYscXZWug&usqp=CAU&ec=48665699" />
      </div>
    </div>
  )
}