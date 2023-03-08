export default function PublicLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return <main className="flex-1">{children}</main>
}
