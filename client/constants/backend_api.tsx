// * Local and Live URLs
export const backend_api_local = "http://127.0.0.1:8080/api"; // * Local backend
export const backend_api_live =
  "https://cassava-disease-detection.onrender.com/api"; // * Live backend

// * This acts like your "state" variable
let api = backend_api_live; // Default to live

// * Function to check and set backend (call this ONCE in your start screen)
export const initBackendApi = async () => {
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
    } else {
      console.log("Using live backend:", backend_api_live);
      api = backend_api_live;
    }
  } catch (error) {
    console.log("ERROR: ", error);
    console.log("Using live backend:", backend_api_live);
    api = backend_api_live;
  }
};

// * Getter — so other files always get the current backend
export const getBackendApi = () => api;
