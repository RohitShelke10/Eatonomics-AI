import { toast } from "sonner";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export const handleApiResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  try {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: "An unexpected error occurred",
      }));
      
      toast.error(errorData.message || "Request failed");
      
      return {
        data: null,
        error: errorData.message || "Request failed",
        status: response.status,
      };
    }

    const data = await response.json();
    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    toast.error(errorMessage);
    
    return {
      data: null,
      error: errorMessage,
      status: 500,
    };
  }
};

// Example usage:
/*
const fetchUserProfile = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}`);
  return handleApiResponse<UserProfile>(response);
};
*/