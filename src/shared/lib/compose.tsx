type ProvidersComposerProps = {
  providers: React.FC<{ children: React.ReactNode }>[];
  children: React.ReactNode;
};

export function ProvidersComposer({
  providers,
  children,
}: ProvidersComposerProps) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
}
