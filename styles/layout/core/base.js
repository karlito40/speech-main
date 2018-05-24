import css from 'styled-jsx/css';

export default css`
  @import 'core/index';

  ::selection {
    background: #262a30;
    color: white;
  }

  body {
    color: $baseTextColor;
    background: $bodyBackgroundColor;
    font: #{$fontSizeBase}/#{$fontLineHeightBase} $fontFamilyBase;
  }


  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    font-weight: bold;
    line-height: 1;
    font-family: $headlineFontFamily;
  }

  @for $i from 1 to 6 {
    h#{$i} {
      font-size: $fontSizeHeadlineBase - $fontSizeHeadlineStep * $i;

      @include tablet() {
        font-size: $fontSizeHeadlineBase - $fontSizeHeadlineStep * $i - 4px;
      }
    }
  }

  p { margin: 20px 0; }

  a {
    & { color: $baseLinkColor; text-decoration: none; border-bottom: 1px solid $colorDarkGrey; }
    &:hover { border-bottom-color: $baseLinkHoverDecorationColor; }
  }

  ul { list-style: none; }

  blockquote { margin: 0; padding: 0; }
`;
