/// HECTOR UNIT TEST

import { useState } from "react";

export default function Hector() {
    let [newFirst, setFirst] = useState('Hector');

    let [newLast, setLast] = useState('Silva');
  return { newFirst, newLast, setFirst, setLast };
}

