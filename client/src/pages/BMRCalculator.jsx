import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import BMRImage from "../utils/Images/BMR.jpg";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 60px; // Increased padding for more spacing
  gap: 5px; // Reduced gap for less spacing between Description and CalculatorContainer
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px; // Adjusted for spacing
  width: 100%; // Ensures the container takes up the full width of its parent
  max-width: 1200px; // Sets a maximum width for the container
  background-color: #f8f9fa; // Optional: Set a background color if you prefer
`;

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 50px 70px; // Adjusted padding to move the container upwards
  max-width: 800px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 28px; // Increased font size for better visibility
  font-weight: 600;
  margin-bottom: 30px; // Increased margin for more spacing
  text-align: center;
  color: #333;
`;

const Description = styled.p`
  font-size: 18px; // Increased font size for better visibility
  text-align: center;
  color: #555;
  margin-bottom: 30px; // Increased margin for more spacing
  max-width: 700px; // Slightly increased max-width for better readability
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px; // Increased gap for more spacing
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 500;
  color: #555;
  flex: 1;
`;

const Input = styled.input`
  width: 150px; // Increased width for better input handling
  padding: 12px; // Increased padding for better touch experience
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  text-align: center;
  font-size: 20px; // Increased font size for better visibility
  /* Add the following line to hide the default arrows */
  -webkit-appearance: none; /* For Chrome, Safari, Opera */
  -moz-appearance: none; /* For Firefox */
  appearance: none; /* Standard syntax */
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 15px; // Increased gap for better spacing
`;

const RadioButton = styled.label`
  display: flex;
  align-items: center;
  gap: 7px; // Increased gap for better spacing
  font-size: 18px; // Increased font size for better visibility
  color: #555;
`;

const Button = styled.button`
  padding: 20px 30px; // Increased padding for a larger button
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  width: 100%;
  font-size: 20px; // Increased font size for better visibility
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ResultContainer = styled.div`
  margin-top: 30px; // Increased margin for more spacing
  text-align: center;
  background-color: #f8f9fa;
  padding: 15px; // Decreased padding slightly for consistency
  border-radius: 10px;
`;

const Result = styled.p`
  font-weight: 600;
  font-size: 22px; // Increased font size for better visibility
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
  font-size: 24px; // Increased font size for better visibility
  margin: 0 15px; // Increased margin for better spacing
`;

const BMRCalculator = () => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("female");
  const [bmr, setBMR] = useState(null);

  const increment = (setter, value) => () => setter((prev) => (prev? parseFloat(prev) + value : value));
  const decrement = (setter, value) => () => setter((prev) => (prev? Math.max(0, parseFloat(prev) - value) : 0));

  const calculateBMR = () => {
    if (age && height && weight && gender) {
      let bmrValue = 0;
      if (gender === "male") {
        bmrValue = 10 * weight + 6.25 * height - 5 * age + 5;
      } else if (gender === "female") {
        bmrValue = 10 * weight + 6.25 * height - 5 * age - 161;
      }
      setBMR(bmrValue);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <PageContainer>
      <Description>
        Hi, you can calculate your Basal Metabolic Rate (BMR).
      <p>
        Your basal metabolic rate (BMR) is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions.
      </p>
      </Description>
      <ContentContainer>
        <CalculatorContainer>
          <Title>BMR CALCULATOR</Title>
          <FormContainer>
            <Row>
              <Label>Age</Label>
              <IconButton onClick={decrement(setAge, 1)}><FaArrowDown /></IconButton>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <IconButton onClick={increment(setAge, 1)}><FaArrowUp /></IconButton>
            </Row>
            <Row>
              <Label>Weight (kg)</Label>
              <IconButton onClick={decrement(setWeight, 0.5)}><FaArrowDown /></IconButton>
              <Input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <IconButton onClick={increment(setWeight, 0.5)}><FaArrowUp /></IconButton>
            </Row>
            <Row>
              <Label>Height (cm)</Label>
              <IconButton onClick={decrement(setHeight, 0.5)}><FaArrowDown /></IconButton>
              <Input
                type="number"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <IconButton onClick={increment(setHeight, 0.5)}><FaArrowUp /></IconButton>
            </Row>
            <Row>
              <Label>Gender</Label>
              <RadioContainer>
                <RadioButton>
                  <input
                    type="radio"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                  Woman
                </RadioButton>
                <RadioButton>
                  <input
                    type="radio"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                  />
                  Man
                </RadioButton>
              </RadioContainer>
            </Row>
            <Button onClick={calculateBMR}>Calculate</Button>
          </FormContainer>
          {bmr && (
            <ResultContainer>
              <Result>BMR: {bmr.toFixed(2)} calories/day</Result>
            </ResultContainer>
          )}
        </CalculatorContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default BMRCalculator;
