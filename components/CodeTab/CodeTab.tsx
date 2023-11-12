import * as React from "react";
import { Tabs } from "nextra-theme-docs";
import { MdxFile } from "nextra";
import Markdown from "react-markdown";

interface Props {
  graphql: string;
  typescript: string;
}

export const CodeTab = ({ graphql, typescript }: Props) => {
  return (
    <Tabs items={["GraphQL", "TypeScript"]}>
      <Tabs.Tab>
        <Markdown>{graphql}</Markdown>
      </Tabs.Tab>
      <Tabs.Tab>{typescript}</Tabs.Tab>
    </Tabs>
  );
};
