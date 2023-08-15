import React, { useState } from "react";

const Confirm = () => {
  const [isGranted, setIsGranted] = useState(true);
  let data;
  data = (
    <div className="confirm">
      <div className="confirm__container">
        <p className="confirm__heading">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <div className="u-center-flex">
          <button className="btn btn--warn">No</button>
          <button className="btn btn--green">Yes</button>
        </div>
      </div>
    </div>
  );
  return [data, isGranted];
};

export default Confirm;
