console.log("Chrome Extension Loaded!");

if (chrome?.ai) {
  console.log("Chrome AI API is available.");
} else {
  console.error("Chrome AI API is NOT available.");
}
