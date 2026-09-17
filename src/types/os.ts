export type AppId =
  | 'about'
  | 'projects'
  | 'ai-assistant'
  | 'spark-mobile'
  | 'smart-presence'
  | 'terminal'
  | 'tech-radar'
  | 'resume-studio'
  | 'system-health'
  | 'contact'
  | 'copilot';

export type ThemeMode = 'cyberpunk' | 'oled' | 'corporate';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface AppDefinition {
  id: AppId;
  title: string;
  icon: string;
  category: 'core' | 'projects' | 'tools';
  badge?: string;
  defaultSize?: { width: number; height: number };
}
