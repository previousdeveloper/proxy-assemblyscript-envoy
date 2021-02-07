// @ts-ignore
export * from "@solo-io/proxy-runtime/proxy";
import { RootContext, Context, registerRootContext, FilterHeadersStatusValues, stream_context } from "@solo-io/proxy-runtime";

class AddHeaderRoot extends RootContext {
    createContext(context_id: u32): Context {
        return new AddHeader(context_id, this);
    }
}

class AddHeader extends Context {
    constructor(context_id: u32, root_context: AddHeaderRoot) {
        super(context_id, root_context);
    }
    onResponseHeaders(a: u32, end_of_stream: bool): FilterHeadersStatusValues {
        stream_context.headers.response.add("hi", "trendyol!");

        return FilterHeadersStatusValues.Continue;
    }

    onRequestHeaders(a: u32, end_of_stream: bool): FilterHeadersStatusValues {
        return super.onRequestHeaders(a, end_of_stream);
    }
}

registerRootContext((context_id: u32) => { return new AddHeaderRoot(context_id); }, "add_header");