"use client";
import { useMDXComponent } from "next-contentlayer/hooks";
import * as Components from "@nextui-org/react";
import type { MDXComponents } from "mdx/types";
import { clsx } from "@nextui-org/shared-utils";
import { ReactNode } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Sandpack } from "@/components/sandpack";

export interface LinkedHeadingProps {
  as: keyof JSX.IntrinsicElements;
  id?: string;
  linked?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const linkedLevels: Record<string, number> = {
  h1: 0,
  h2: 1,
  h3: 2,
  h4: 3,
};

const LinkedHeading: React.FC<LinkedHeadingProps> = ({
  as,
  linked = true,
  id: idProp,
  className,
  ...props
}) => {
  const Component = as;

  const level = linkedLevels[as] || 1;

  return (
    <Component
      className={clsx({ "linked-heading": linked }, linked ? {} : className)}
      data-id={idProp}
      data-level={level}
      data-name={props.children}
      id={idProp}
      {...props}
    >
      {props.children}
    </Component>
  );
};

const isHighlight = (meta: string) => {
  const RE = /{([\d,-]+)}/;

  if (!meta || !RE.test(meta)) {
    return () => false;
  }

  const highlightLineNumStr = RE.exec(meta)![1];

  return (lineNum: number) => {
    const inRange = highlightLineNumStr
      .split(",")
      .map((v) => v.split("-").map((x) => parseInt(x, 10)))
      .some(([start, end]) => {
        return end ? lineNum >= start && lineNum <= end : lineNum === start;
      });

    return inRange;
  };
};

const Code = ({
  children,
  className = "",
  meta,
}: {
  children: ReactNode;
  className?: string;
  meta: string;
}) => {
  const codeString = String(children).trim();
  const isMultiLine = codeString.split("\n").length > 2;

  const [langStr, filename] = className?.split(":");
  const lang = langStr?.replace("language-", "") ?? "tsx";
  const shouldHighlight = isHighlight(meta);

  if (!isMultiLine) {
    return <code className="text-sky-600">{codeString}</code>;
  }

  return (
    <div>
      {filename && (
        <h2 className="not-prose px-4 py-1 text-sky-400">{filename}</h2>
      )}
      <Highlight theme={themes.vsDark} code={codeString} language={lang}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className="not-prose p-4">
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line })}
                className={clsx({
                  "bg-gradient-to-r from-blue-500/20 to-transparent":
                    shouldHighlight(i + 1),
                })}
              >
                <span className="mr-4 text-slate-300">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

const mdxComponents = {
  ...Components,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <LinkedHeading as="h1" linked={false} {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <LinkedHeading as="h2" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <LinkedHeading as="h3" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <LinkedHeading as="h4" {...props} />
  ),
  code: Code,
  Sandpack,
} as unknown as Record<string, React.ReactNode>;

const MDXContent = ({ code }: { code: string }) => {
  const MDXContent = useMDXComponent(code);

  return <MDXContent components={mdxComponents as MDXComponents} />;
};

export default MDXContent;
