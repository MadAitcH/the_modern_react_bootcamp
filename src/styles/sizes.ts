type Size = "xs" | "sm" | "md" | "lg" | "xl";

const sizes = {
  up() {},

  down(size: Size) {
    const sizes: { [key in Size]: string } = {
      xs: "575.98px",
      sm: "767.98px",
      md: "991.98px",
      lg: "1199.98px",
      xl: "1600px",
    };

    return `@media (max-width: ${sizes[size]})`;
  },
};

export default sizes;
