# stupid-hooks

react hooks nobody asked for

## useDoubleRightClick

fires on two right clicks within 300ms. blocks the context menu on the element, can't see click two otherwise

```tsx
const props = useDoubleRightClick(() => alert('why'))
return <div {...props}>right click me twice</div>
```

## dev

```sh
pnpm install --frozen-lockfile
pnpm exec husky
pnpm check
```

scripts are disabled in `.npmrc`, so husky doesn't self-install on `pnpm install`
