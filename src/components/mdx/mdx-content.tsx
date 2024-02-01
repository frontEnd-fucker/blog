"use client";
import { useMDXComponent } from "next-contentlayer/hooks";
import * as Components from "@nextui-org/react";
import type { MDXComponents } from "mdx/types";
import { clsx } from "@nextui-org/shared-utils";
import { ReactNode } from "react";
import { Highlight, themes } from "prism-react-renderer";

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

const Code = ({ children }: { children: ReactNode }) => {
  const codeString = String(children).trim();
  const isMultiLine = codeString.split("\n").length > 2;

  if (!isMultiLine) {
    return <code className="text-sky-600">{codeString}</code>;
  }

  return (
    <Highlight theme={themes.vsDark} code={codeString} language="tsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} className="not-prose p-4">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className="mr-4 text-slate-300">{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
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
} as unknown as Record<string, React.ReactNode>;

const MDXContent = ({ code }: { code: string }) => {
  const MDXContent = useMDXComponent(code);

  return <MDXContent components={mdxComponents as MDXComponents} />;
};

export default MDXContent;
