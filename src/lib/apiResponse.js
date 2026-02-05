import { NextResponse } from "next/server";

export const apiResponse = ({
  message,
  details = null,
  success = true,
  status = 200,
}) => {
  return NextResponse.json(
    {
      message,
      details,
      success,
    },
    { status },
  );
};

export const apiError = (message, details = null, status = 400) => {
  return apiResponse({
    message,
    details,
    success: false,
    status,
  });
};

export const apiSuccess = (message, details = null, status = 200) => {
  return apiResponse({
    message,
    details,
    success: true,
    status,
  });
};
