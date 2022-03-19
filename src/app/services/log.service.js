import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";


function init() {
    Sentry.init({
        dsn: "https://5e889dc6a5614001bd7774bbb19a3cf3@o1171588.ingest.sentry.io/6266206",
        integrations: [new BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}

function log(error) {
    Sentry.captureException(error)

}

const logger = {
    init,
    log
}
export default logger