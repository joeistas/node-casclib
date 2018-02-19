#pragma once

#include <string>
#include "napi.h"

using namespace std;

namespace errors {
    constexpr char* invalidParameterMessage = "Invalid parameter.";
    constexpr char* invalidHandleMessage = "Invalid handle.";
    constexpr char* insufficientBuffer = "Insufficient buffer.";
    constexpr char* notEnoughMemory = "Not enough memory.";
    constexpr char* fileNotFound = "File not found.";

    void ThrowJavascriptError(Napi::Env env, const string& message);
    void ThrowJavascriptTypeError(Napi::Env env, const string& message);
    void ThrowJavascriptErrorWithLastError(Napi::Env env, const string& message);
    string ErrorMessage(const string& message, const int errorCode);
    string ErrorCodeToString(const int errorCode);
}
