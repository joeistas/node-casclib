#include <string>
#include <CascLib.h>
#include <CascPort.h>
#include "napi.h"
#include "errors.h"

using namespace std;
using namespace errors;

void errors::ThrowJavascriptError(Napi::Env env, const string& message) {
    Napi::Error::New(env, message)
        .ThrowAsJavaScriptException();
}

void errors::ThrowJavascriptTypeError(Napi::Env env, const string& message) {
    Napi::TypeError::New(env, message)
        .ThrowAsJavaScriptException();
}

void errors::ThrowJavascriptErrorWithLastError(Napi::Env env, const string& message) {
    int errorCode = GetLastError();

    string errorMessage = ErrorMessage(message, errorCode);

    ThrowJavascriptError(env, errorMessage);
}

string errors::ErrorMessage(const string& message, const int errorCode) {
    return string(message) + " " + ErrorCodeToString(errorCode);
}

string errors::ErrorCodeToString(const int errorCode) {
    char* message;
    switch(errorCode) {
        case ERROR_INVALID_PARAMETER:
            message = invalidParameterMessage;
            break;

        case ERROR_INVALID_HANDLE:
            message = invalidHandleMessage;
            break;

        case ERROR_INSUFFICIENT_BUFFER:
            message = insufficientBuffer;
            break;

        case ERROR_NOT_ENOUGH_MEMORY:
            message = notEnoughMemory;
            break;

        case ERROR_FILE_NOT_FOUND:
            message = fileNotFound;
            break;

        default:
            message = "";
    }

    return string(message) + " (CascLib:" + to_string(errorCode) + ")";
}
