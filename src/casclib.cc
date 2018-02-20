#include <CascLib.h>
#include "napi.h"

#include "errors.h"
#include "locales.h"
#include "storageinfo.h"
#include "storage.h"
#include "find.h"

using namespace std;

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    locales::Init(env, exports);
    storageinfo::Init(env, exports);
    storage::Init(env, exports);
    find::Init(env, exports);

    return exports;
}

NODE_API_MODULE(addon, Init)
