import { ReactNode } from "react";
import LottieHandler from "../../feadback/LottieHandler/LottieHandler";

type TDisplayProps<T> = {
  records: T[];
  renderItime: (record: T) => ReactNode;
  Emptymessage: string;
};
type id = { id?: number };
const DisplayList = <T extends id>({
  records,
  Emptymessage,
  renderItime
}: TDisplayProps<T>) => {
  const list =
    records.length > 0 ?
    
    records.map((record) => (
    <div
      key={record.id}
      className=" d-flex justify-content-center align-items-center col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3  my-3  "
    >
      {renderItime(record)}
    </div>
  ))

    :<LottieHandler type="empty" message={Emptymessage} />

    return <div className="row my-2 ">{list}</div>;
};

export default DisplayList;
