import {NextApiRequest, NextApiResponse} from "next";
import {Unbody} from "@unbody-io/ts-client";
import {demoPresets, methodsCategories} from "../../lib/demo.service";

const methods = methodsCategories.flatMap((category) => category.methods);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        presetKey,
        methodKey,
        input,
        sourceTypes
    } = req.body;

    const preset = demoPresets.find((preset) => preset.key === presetKey);
    const method = methods.find((method) => method.key === methodKey);

    if (!preset || !method) {
        return res.status(400).json({
            error: "Invalid preset or method"
        });
    }

    const apiKey = process.env[`DEMO_API_KEY_${preset.key.toUpperCase()}`];
    const projectId = process.env[`DEMO_PROJECT_ID_${preset.key.toUpperCase()}`];

    const unbody = new Unbody({apiKey, projectId});

    const {data} = await unbody.exec(
        ...sourceTypes.map((sourceType) =>
            method.handler(input, unbody, sourceType)
        ),
    );

    let response = {};

    if (data.length === 1) {
        response = {
            ...(data[0].generate? {generate: data[0].generate.result}: {}),
            payload: data[0].payload
        };
    }else{
        for(const {payload, generate, _original} of data){
            const sourceType = Object.keys(_original.data.Get)[0];
            response[sourceType] = {
                ...(generate? {generate: generate.result}: {}),
                payload
            };
        }
    }

    return res.status(200).json({
        data: response
    });
}
