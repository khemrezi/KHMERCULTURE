const defaultConfig = {
  site_title: "Pvideo for Pviewer",
  tagline: "Breaking News & Video Updates 24/7",
  main_heading: "Watch Video",
  content_text: "Stay informed with the latest breaking news videos from around the world. Watch live coverage, exclusive interviews, and in-depth reports on the stories that matter most.",
  background_color: "#f5f5f5",
  surface_color: "#ffffff",
  text_color: "#2c3e50",
  primary_color: "#3498db",
  accent_color: "#e8e8e8",
  font_family: "sans-serif",
  font_size: 16
};

async function onConfigChange(config) {
  const siteTitle = config.site_title || defaultConfig.site_title;
  const tagline = config.tagline || defaultConfig.tagline;
  const mainHeading = config.main_heading || defaultConfig.main_heading;
  const contentText = config.content_text || defaultConfig.content_text;
  const backgroundColor = config.background_color || defaultConfig.background_color;
  const surfaceColor = config.surface_color || defaultConfig.surface_color;
  const textColor = config.text_color || defaultConfig.text_color;
  const primaryColor = config.primary_color || defaultConfig.primary_color;
  const accentColor = config.accent_color || defaultConfig.accent_color;
  const fontFamily = config.font_family || defaultConfig.font_family;
  const fontSize = config.font_size || defaultConfig.font_size;

  document.getElementById('site-title').textContent = siteTitle;
  document.getElementById('tagline').textContent = tagline;
  document.getElementById('main-heading').textContent = mainHeading;
  document.getElementById('content-text').textContent = contentText;

  document.body.style.background = backgroundColor;
  document.body.style.fontFamily = `${fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`;
  document.body.style.fontSize = `${fontSize}px`;

  const header = document.querySelector('header');
  const contentArea = document.querySelector('.content-area');
  header.style.background = surfaceColor;
  contentArea.style.background = surfaceColor;

  const headings = document.querySelectorAll('h1, h2');
  headings.forEach(h => h.style.color = textColor);

  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(p => {
    if (!p.closest('footer')) {
      p.style.color = textColor;
    }
  });

  const adSpaces = document.querySelectorAll('.ad-space');
  adSpaces.forEach(ad => ad.style.background = accentColor);
}

function mapToCapabilities(config) {
  return {
    recolorables: [
      {
        get: () => config.background_color || defaultConfig.background_color,
        set: (value) => {
          config.background_color = value;
          window.elementSdk.setConfig({ background_color: value });
        }
      },
      {
        get: () => config.surface_color || defaultConfig.surface_color,
        set: (value) => {
          config.surface_color = value;
          window.elementSdk.setConfig({ surface_color: value });
        }
      },
      {
        get: () => config.text_color || defaultConfig.text_color,
        set: (value) => {
          config.text_color = value;
          window.elementSdk.setConfig({ text_color: value });
        }
      },
      {
        get: () => config.primary_color || defaultConfig.primary_color,
        set: (value) => {
          config.primary_color = value;
          window.elementSdk.setConfig({ primary_color: value });
        }
      },
      {
        get: () => config.accent_color || defaultConfig.accent_color,
        set: (value) => {
          config.accent_color = value;
          window.elementSdk.setConfig({ accent_color: value });
        }
      }
    ],
    borderables: [],
    fontEditable: {
      get: () => config.font_family || defaultConfig.font_family,
      set: (value) => {
        config.font_family = value;
        window.elementSdk.setConfig({ font_family: value });
      }
    },
    fontSizeable: {
      get: () => config.font_size || defaultConfig.font_size,
      set: (value) => {
        config.font_size = value;
        window.elementSdk.setConfig({ font_size: value });
      }
    }
  };
}

function mapToEditPanelValues(config) {
  return new Map([
    ["site_title", config.site_title || defaultConfig.site_title],
    ["tagline", config.tagline || defaultConfig.tagline],
    ["main_heading", config.main_heading || defaultConfig.main_heading],
    ["content_text", config.content_text || defaultConfig.content_text]
  ]);
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}

// Page navigation functionality
document.getElementById('page2-btn').addEventListener('click', function() {
  window.open('https://example.com/page2', '_blank', 'noopener,noreferrer');
});

document.getElementById('page3-btn').addEventListener('click', function() {
  window.open('https://example.com/page3', '_blank', 'noopener,noreferrer');
});