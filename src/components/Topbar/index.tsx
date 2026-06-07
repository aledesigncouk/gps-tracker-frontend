import { JSX } from "react";
import YearSelector from "@components/YearSelector";
import DateRangeSelector from "@/components/DateRangeSelector";
import { Row, Col } from "react-bootstrap";


const Topbar = (): JSX.Element => {
  return (
    <Row className="pt-2 d-flex align-items-center" data-testid="topbar">
      <Col>
        <DateRangeSelector />
      </Col>
      <Col>
        <YearSelector />
      </Col>
    </Row>
  );
};

export default Topbar;
