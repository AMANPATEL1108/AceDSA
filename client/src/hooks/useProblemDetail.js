import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { toast } from 'react-hot-toast';

const useProblemDetail = (id, initialIsSolved) => {
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [isAllPassed, setIsAllPassed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSolved, setIsSolved] = useState(initialIsSolved || false);
  const [activeTab, setActiveTab] = useState("description");
  const [submissions, setSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        const response = await api.get(`/problems/${id}`);
        setProblem(response.data);
        setCode(response.data.template);
      } catch (err) {
        console.error("Error fetching problem data:", err);
        toast.error("Failed to load problem data");
      }
    };

    const fetchSubmissions = async () => {
      try {
        const userID = localStorage.getItem("userID");
        if (userID) {
          const response = await api.get(`/problems/submissions/${userID}/${id}`);
          setSubmissions(response.data);
        }
      } catch (err) {
        console.error("Error fetching submissions:", err);
        toast.error("Failed to load submissions");
      }
    };

    fetchProblemData();
    fetchSubmissions();

    const userID = localStorage.getItem("userID");
    setIsLoggedIn(!!userID);
  }, [id]);

  useEffect(() => {
    let timer;
    if (startTime) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime]);

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      toast.error('Please log in to submit your solution.');
      return;
    }

    setIsSubmitting(true);
    setTestResults([]);
    setIsAllPassed(false);

    const endTime = Date.now();
    const duration = startTime ? endTime - startTime : 0;

    try {
      const userID = localStorage.getItem("userID");
      const response = await api.post(`/problems/${id}/submit`, { code, userID, duration });
      setTestResults(response.data.testResults);
      setIsAllPassed(response.data.isAllPassed);

      if (response.data.isAllPassed) {
        setIsSolved(true);
        toast.success('Problem submitted successfully!');
      } else {
        toast.warn('Some test cases failed. Keep trying!');
      }

      const submissionsResponse = await api.get(`/problems/submissions/${userID}/${id}`);
      setSubmissions(submissionsResponse.data);
    } catch (err) {
      console.error("Error submitting solution:", err);
      toast.error('Error submitting solution. Please try again.');
    } finally {
      setIsSubmitting(false);
      setStartTime(null);
      setElapsedTime(0);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return {
    problem,
    code,
    setCode,
    testResults,
    isAllPassed,
    isLoggedIn,
    isSolved,
    activeTab,
    setActiveTab,
    submissions,
    handleSubmit,
    handleLogin,
    elapsedTime,
    setStartTime,
  };
};

export default useProblemDetail;
