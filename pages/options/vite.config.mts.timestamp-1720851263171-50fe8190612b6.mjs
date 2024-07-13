// vite.config.mts
import { defineConfig } from "file:///Users/keumky2/Desktop/side-project/copy-url/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.11/node_modules/vite/dist/node/index.js";
import react from "file:///Users/keumky2/Desktop/side-project/copy-url/node_modules/.pnpm/@vitejs+plugin-react-swc@3.6.0_vite@5.2.11/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve } from "path";
import { watchRebuildPlugin } from "file:///Users/keumky2/Desktop/side-project/copy-url/packages/hmr/dist/index.js";
var __vite_injected_original_dirname = "/Users/keumky2/Desktop/side-project/copy-url/pages/options";
var rootDir = resolve(__vite_injected_original_dirname);
var srcDir = resolve(rootDir, "src");
var isDev = process.env.__DEV__ === "true";
var isProduction = !isDev;
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": srcDir
    }
  },
  base: "",
  plugins: [react(), isDev && watchRebuildPlugin({ refresh: true })],
  publicDir: resolve(rootDir, "public"),
  build: {
    outDir: resolve(rootDir, "..", "..", "dist", "options"),
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    rollupOptions: {
      external: ["chrome"]
    }
  },
  define: {
    "process.env.NODE_ENV": isDev ? `"development"` : `"production"`
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2tldW1reTIvRGVza3RvcC9zaWRlLXByb2plY3QvY29weS11cmwvcGFnZXMvb3B0aW9uc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2tldW1reTIvRGVza3RvcC9zaWRlLXByb2plY3QvY29weS11cmwvcGFnZXMvb3B0aW9ucy92aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2tldW1reTIvRGVza3RvcC9zaWRlLXByb2plY3QvY29weS11cmwvcGFnZXMvb3B0aW9ucy92aXRlLmNvbmZpZy5tdHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgd2F0Y2hSZWJ1aWxkUGx1Z2luIH0gZnJvbSAnQGNocm9tZS1leHRlbnNpb24tYm9pbGVycGxhdGUvaG1yJztcblxuY29uc3Qgcm9vdERpciA9IHJlc29sdmUoX19kaXJuYW1lKTtcbmNvbnN0IHNyY0RpciA9IHJlc29sdmUocm9vdERpciwgJ3NyYycpO1xuXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Ll9fREVWX18gPT09ICd0cnVlJztcbmNvbnN0IGlzUHJvZHVjdGlvbiA9ICFpc0RldjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQHNyYyc6IHNyY0RpcixcbiAgICB9LFxuICB9LFxuICBiYXNlOiAnJyxcbiAgcGx1Z2luczogW3JlYWN0KCksIGlzRGV2ICYmIHdhdGNoUmVidWlsZFBsdWdpbih7IHJlZnJlc2g6IHRydWUgfSldLFxuICBwdWJsaWNEaXI6IHJlc29sdmUocm9vdERpciwgJ3B1YmxpYycpLFxuICBidWlsZDoge1xuICAgIG91dERpcjogcmVzb2x2ZShyb290RGlyLCAnLi4nLCAnLi4nLCAnZGlzdCcsICdvcHRpb25zJyksXG4gICAgc291cmNlbWFwOiBpc0RldixcbiAgICBtaW5pZnk6IGlzUHJvZHVjdGlvbixcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogaXNQcm9kdWN0aW9uLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbJ2Nocm9tZSddLFxuICAgIH0sXG4gIH0sXG4gIGRlZmluZToge1xuICAgICdwcm9jZXNzLmVudi5OT0RFX0VOVic6IGlzRGV2ID8gYFwiZGV2ZWxvcG1lbnRcImAgOiBgXCJwcm9kdWN0aW9uXCJgLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtXLFNBQVMsb0JBQW9CO0FBQy9YLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsU0FBUywwQkFBMEI7QUFIbkMsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTSxVQUFVLFFBQVEsZ0NBQVM7QUFDakMsSUFBTSxTQUFTLFFBQVEsU0FBUyxLQUFLO0FBRXJDLElBQU0sUUFBUSxRQUFRLElBQUksWUFBWTtBQUN0QyxJQUFNLGVBQWUsQ0FBQztBQUV0QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxtQkFBbUIsRUFBRSxTQUFTLEtBQUssQ0FBQyxDQUFDO0FBQUEsRUFDakUsV0FBVyxRQUFRLFNBQVMsUUFBUTtBQUFBLEVBQ3BDLE9BQU87QUFBQSxJQUNMLFFBQVEsUUFBUSxTQUFTLE1BQU0sTUFBTSxRQUFRLFNBQVM7QUFBQSxJQUN0RCxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixzQkFBc0I7QUFBQSxJQUN0QixlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsUUFBUTtBQUFBLElBQ3JCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sd0JBQXdCLFFBQVEsa0JBQWtCO0FBQUEsRUFDcEQ7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
