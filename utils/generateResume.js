export const generateResumePDF = () => {
  // Path to the resume in the public folder
  const resumeUrl = 'CV_Idriss_CHAHRAOUI.pdf';
  
  // Create a temporary anchor to trigger download
  const link = document.createElement('a');
  link.href = resumeUrl;
  link.download = 'CHAHRAOUI_Idriss_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};