import "./App.css";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { responses } from "./responses";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ModelPerfGraph() {
  const data = {
    labels: ["GPT4", "Mixtral"],
    datasets: [
      {
        label: "Accuracy",
        data: [0.911, 0.673],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Average accuracy of models evaluated by Val's equal_intent metric",
      },
    },
  };

  return (
    <div>
      <div style={{ width: "600px", margin: "0 auto" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

const ResponseCard = () => {
  const [index, setIndex] = useState(0);
  const [header, setHeader] = useState(responses[0].model);
  const [responseText, setResponseText] = useState(responses[0].answer);
  const [isCorrect, setIsCorrect] = useState(responses[0].correct);

  const handleClick = () => {
    let newIndex = index === 0 ? 1 : 0;
    setIndex(newIndex);
    setHeader(responses[newIndex].model);
    setResponseText(responses[newIndex].answer);
    setIsCorrect(responses[newIndex].correct);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
        width: "100%",
      }}
    >
      <h3
        style={{
          cursor: "pointer",
          background: isCorrect ? "rgb(182, 255, 182)" : "rgb(255, 182, 182)",
          padding: "10px",
          borderRadius: "5px",
        }}
        onClick={handleClick}
      >
        {header}
      </h3>
      <p
        style={{
          maxHeight: "200px",
          overflow: "scroll",
        }}
      >
        {responseText}
      </p>
    </div>
  );
};
function App() {
  const headers = [
    "GPT4 and Mixtral's relative performance",
    "A case study into where GPT4 and Mixtral differs",
  ];

  return (
    <div className="App">
      <div className="sidebar">
        <h2>Table of Contents</h2>
        <ul>
          <li>
            <a href="#section1">{headers[0]}</a>
          </li>
          <li>
            <a href="#section2">{headers[1]}</a>
          </li>
        </ul>
      </div>

      <div className="content">
        <h1>Comparing GPT4 and Mixtral on specialized medical data</h1>
        <section id="section1">
          <h2>{headers[0]}</h2>
          <ModelPerfGraph />
          <p>
            As seen by evaluating our models on intent-accuracy, GPT-4
            significantly outperforms Mixtral 8x7B for some key reasons. First,
            GPT-4 has nearly 40 times more parameters than Mixtral, making it a
            much larger and more complex model. This vast number of parameters,
            combined with its training on an extensive and diverse dataset,
            allows GPT-4 to capture more intricate patterns and nuances,
            especially in specialized domains like medicine. In contrast,
            Mixtral 8x7B, though highly efficient with is Sparse Mixture of
            Experts (SMOE) architecture, might not have the same depth of
            inference for such complex tasks due to its smaller size and
            training scope. As a benefit Mixtral's design allows for faster
            processing times and lower computational costs, making it highly
            suitable for general-purpose tasks. However, this efficiency can
            sometimes come at the cost of the deep inference required for
            specialized applications, like medical recognition.
          </p>
        </section>
        <section id="section2">
          <h2>{headers[1]}</h2>
          <p style={{ fontWeight: "bold" }}>
            Q: How to diagnose Parasites - Trichuriasis (also known as Whipworm
            Infection) ?
          </p>
          <ResponseCard />
          <p>
            It appears that GPT-4 outperforms Mistral in synthesizing data and
            providing direct answers to questions. Mistral tends to simply
            repeat information, without ensuring that the responses are clear
            and concise. This highlights GPT-4&apos;s superior ability to draw
            inferences from specialized datasets and demonstrates a deeper
            understanding of the information provided.
          </p>
        </section>
      </div>
    </div>
  );
}

export default App;
