import React, { useState } from "react";
import { getHashCode, intToHSL, stringToColor } from "./util/util";

export default ({ user }) => {
  return <div className="user-circle user letterCircle text-white" style={{ backgroundColor: intToHSL(getHashCode(user.username)) }}>
    {user.username.charAt(0)}
  </div>
}