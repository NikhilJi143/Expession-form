import { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ExpressionForm = () => {
  const initialRule = {
    key: "age",
    output: {
      value: "",
      operator: ">=",
      score: "",
    },
  };
  const [rules, setRules] = useState([initialRule]);
  const [combinator, setCombinator] = useState("and");
  const [submittedData, setSubmittedData] = useState(null);
  const [showOutput, setShowOutput] = useState(false);

  const handleAddExpression = () => {
    setRules([
      ...rules,
      {
        key: "age",
        output: {
          value: "",
          operator: ">=",
          score: "",
        },
      },
    ]);
    showToast("Expression added successfully!", "info");
  };

  const handleDeleteExpression = (index) => {
    if (rules.length === 1) {
      showToast("Cannot delete the first rule.", "error");
      return;
    }
    const updatedRules = [...rules];
    updatedRules.splice(index, 1);
    setRules(updatedRules);
    showToast("Expression deleted successfully!", "error");
  };

  const handleInputChange = (index, field, value) => {
    const updatedRules = [...rules];
    updatedRules[index][field] = value;
    setRules(updatedRules);
  };

  const handleOutputChange = (index, field, value) => {
    const updatedRules = [...rules];
    updatedRules[index].output[field] = value;
    setRules(updatedRules);
  };

  const handleCombinatorChange = (value) => {
    setCombinator(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredRules = rules.filter(
      (rule) =>
        rule.key !== "" && rule.output.value !== "" && rule.output.score !== ""
    );

    if (filteredRules.length === 0) {
      showToast("Please fill in all fields before submitting.", "info");
      return;
    }

    const output = {
      rules: filteredRules,
      combinator: combinator || "and",
    };

    setSubmittedData(output);
    setShowOutput(true);
    showToast("Form submitted successfully!", "success");
  };

  const showToast = (message, type) => {
    toast[type](message, {
      autoClose: 2000,
    });
  };

  return (
    <div onSubmit={handleSubmit}>
      <Form
        className="mx-auto mt-3 p-5 border rounded "
        style={{ maxWidth: "90%" }}
      >
        <ToastContainer />
        {rules.map((rule, index) => (
          <Row key={index} className="mb-3">
            <Col xs={12} sm={6} md={4} lg={3}>
              <Form.Group
                controlId={`ruleType-${index}`}
                className="text-center"
              >
                <Form.Label className="fw-bold">Rule Type</Form.Label>
                <Form.Select
                  value={rule.output.key}
                  onChange={(e) =>
                    handleInputChange(index, "key", e.target.value)
                  }
                >
                  <option value="age">Age</option>
                  <option value="credit_score">Credit Score</option>
                  <option value="account_balance">Account Balance</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              <Form.Group
                controlId={`operator-${index}`}
                className="text-center"
              >
                <Form.Label className="fw-bold ">Operator</Form.Label>
                <Form.Select
                  value={rule.output.operator}
                  onChange={(e) =>
                    handleOutputChange(index, "operator", e.target.value)
                  }
                >
                  <option value=">">{">"}</option>
                  <option value="<">{"<"}</option>
                  <option value=">=">{">="}</option>
                  <option value="<=">{"<="}</option>
                  <option value="=">{"="}</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4} lg={2}>
              <Form.Group controlId={`value-${index}`} className="text-center">
                <Form.Label className="fw-bold">Value</Form.Label>
                <Form.Control
                  type="number"
                  value={rule.output.value}
                  onChange={(e) =>
                    handleOutputChange(index, "value", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4} lg={2}>
              <Form.Group controlId={`score-${index}`} className="text-center">
                <Form.Label className="fw-bold">Score</Form.Label>
                <Form.Control
                  type="number"
                  value={rule.output.score}
                  onChange={(e) =>
                    handleOutputChange(index, "score", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={2}
              className="d-flex align-items-end mt-2"
            >
              <Button
                style={{ width: "100%", fontSize: "16px" }}
                variant="danger"
                onClick={() => handleDeleteExpression(index)}
              >
                Delete
              </Button>
            </Col>
          </Row>
        ))}
        <Button
          variant="primary"
          onClick={handleAddExpression}
          className="mb-3 d-block mx-auto"
          style={{ width: "50%" }}
        >
          Add Expression
        </Button>
        <Row className="mt-4 d-flex justify-content-center">
          <Col xs={12} sm={12} md={6} lg={4}>
            <Form.Group controlId="combinator" className="text-center">
              <Form.Label className="fw-bold">Combinator</Form.Label>
              <Form.Select
                className="w-100  mb-3"
                value={combinator}
                onChange={(e) => handleCombinatorChange(e.target.value)}
              >
                <option value="and">AND</option>
                <option value="or">OR</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6} className="mt-3 d-block mx-auto">
            <Button
              variant="success"
              type="submit"
              style={{ width: "100%", fontSize: "20px" }}
            >
              Submit
            </Button>
          </Col>
        </Row>
        {showOutput && (
          <div className="mt-4 bg-light p-4 rounded">
            <h1 className="d-flex justify-content-center bg-secondary p-2 rounded">
              Output Data
            </h1>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </Form>
    </div>
  );
};

export default ExpressionForm;
