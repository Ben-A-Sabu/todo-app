

export default function Body(props) {
  return (
    <>
      <div className="headings" >
        {props.heading}
      </div>
      <div className="List" id="generallist">
        {props.children}
      </div>
   </>
  );
}
