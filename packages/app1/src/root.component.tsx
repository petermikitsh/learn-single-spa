import React from "react";

export default function Root(props) {
  const [sum, setSum] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      // add is type 'any'
      const { add } = await System.import("@exampleorg/util4");
      setSum(add(2, 2));
    })();
  });
  return (
    <>
      <section>{props.name} is mounted!</section>
      <div>Sum is {sum}.</div>
    </>
  );
}
