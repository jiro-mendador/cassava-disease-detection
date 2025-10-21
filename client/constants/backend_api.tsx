// * Local and Live URLs
export const backend_api_local = "http://127.0.0.1:8080/api"; // * Local backend
export const backend_api_live =
  "https://cassava-disease-detection.onrender.com/api"; // * Live backend

// * This acts like your "state" variable
let api = backend_api_live; // * Default to live

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// * Function to check and set backend
export const initBackendApi = async () => {
  // * Try Local Backend First
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000); // 2s timeout

    const res = await fetch(`${backend_api_local}`, {
      method: "GET",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (res.ok) {
      console.log("Local backend detected:", backend_api_local);
      api = backend_api_local;
      return;
    }
  } catch (err) {
    console.error(err);
    console.log("Local backend not available, trying live backend...");
  }

  //* Try Live Backend with Retry Loop
  const maxRetries = 20; // * how many times to retry
  const retryDelay = 3000; // * 3 seconds between tries

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000); // * 5s timeout

      const res = await fetch(`${backend_api_live}`, {
        method: "GET",
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (res.ok) {
        console.log(
          `Connected to live backend on attempt ${attempt}:`,
          backend_api_live
        );
        api = backend_api_live;
        return;
      }
    } catch (error) {
      console.error(error);
      console.log(
        `Live backend connection failed (attempt ${attempt}/${maxRetries}). Retrying in ${
          retryDelay / 1000
        }s...`
      );
      await delay(retryDelay);
    }
  }

  console.log("Failed to connect to live backend after multiple retries.");
  api = backend_api_live;
};

// // * Function to check and set backend (call this ONCE in your start screen)
// export const initBackendApi = async () => {
//   try {
//     const controller = new AbortController();
//     const timeout = setTimeout(() => controller.abort(), 2000); // 2s timeout

//     const res = await fetch(`${backend_api_local}`, {
//       method: "GET",
//       signal: controller.signal,
//     });

//     clearTimeout(timeout);

//     if (res.ok) {
//       console.log("Local backend detected:", backend_api_local);
//       api = backend_api_local;
//     } else {
//       console.log("Using live backend:", backend_api_live);
//       api = backend_api_live;
//     }
//   } catch (error) {
//     console.log("ERROR: ", error);
//     console.log("Using live backend:", backend_api_live);
//     api = backend_api_live;
//   }
// };

// * Getter — so other files always get the current backend
export const getBackendApi = () => api;
