<?php

namespace App\Traits;

trait HttpResponses
{
  protected function success($data, $message = null, int $code = 200)
  {
    return response()->json([
      'status' => 'Success',
      'message' => $message,
      'data' => $data
    ], $code);
  }

  protected function error($data, $message , int $code)
  {
    return response()->json([
      'status' => 'Error',
      'message' => $message,
      'data' => $data
    ], $code);
  }
}
